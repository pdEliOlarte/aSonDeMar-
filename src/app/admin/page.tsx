"use client"
import {getLeads, updateLeadStatus} from '@/Services/bookingService';
import {useState, useEffect} from 'react';
import jsPDF from 'jspdf';//npm install jspdf

export default function AdminPage() {
    const [leads, setLeads] = useState([]);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    useEffect(() => {
        if (isAuthenticated) {
            getLeads().then((data:any) => setLeads(data)).catch((err:any) => console.error(err))
        }
    },[isAuthenticated]);

    async function updateStatus(leadId: number , newStatus: string) {
        try {
            await updateLeadStatus(leadId, newStatus)
            const fresh = await getLeads()
            setLeads(fresh)

            if (newStatus === 'confirmed') {
                const lead = fresh.find((l:any) => l.id === leadId)
                if (lead) generateContract(lead)
            }
        } catch (err) {
            console.error('Error updating status:', err)
            alert('Error actualizando el estado. Revisa la consola.')
        }
    }

    function generateContract(lead: any) {
        try {
            const doc = new jsPDF()
            doc.setFontSize(18)
            doc.text('Contrato de Reserva - aSonDeMar', 20, 30)
            doc.setFontSize(12)
            doc.text(`Lead ID: ${lead.id}`, 20, 50)
            doc.text(`Nombre: ${lead.customer_name || lead.customer_name}`, 20, 60)
            doc.text(`Email: ${lead.customer_email || ''}`, 20, 70)
            doc.text(`Teléfono: ${lead.customer_phone || ''}`, 20, 80)
            doc.text(`Fecha: ${lead.event_date || ''} ${lead.event_time || ''}`, 20, 90)
            doc.text(`Personas (Pax): ${lead.pax || ''}`, 20, 100)
            doc.text(`Barco: ${lead.boat?.name || ''}`, 20, 110)
            doc.text('Gracias por confiar en aSonDeMar.', 20, 140)
            doc.save(`contract_${lead.id}.pdf`)
        } catch (err) {
            console.error('Error generating contract PDF:', err)
        }
    }

        if (!isAuthenticated) {
                return (
                    <div className="p-8">
                        <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} className="border p-2 mr-2" />
                        <button onClick={() => password === ADMIN_PASSWORD && setIsAuthenticated(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Entrar</button>
                    </div>
                );
            }

            return (
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4">Panel de Solicitudes</h1>
                    <table className="w-full border">
                        <thead><tr><th className="p-2 border">Cliente</th><th className="p-2 border">Bote</th><th className="p-2 border">Fecha</th><th className="p-2 border">Estado</th><th className="p-2 border">Acciones</th></tr></thead>
                        <tbody>
                            {leads.map((lead:any) => (
                                <tr key={lead.id} className="odd:bg-white even:bg-slate-50">
                                    <td className="p-2 border">{lead.customer_name}<br/>{lead.customer_phone}</td>
                                    <td className="p-2 border">{lead.boat?.name}</td>
                                    <td className="p-2 border">{lead.event_date} {lead.event_time}</td>
                                    <td className="p-2 border">{lead.booking_status}</td>
                                    <td className="p-2 border">
                                        {lead.booking_status === 'pending' && (
                                            <>
                                                <button onClick={() => updateStatus(lead.id, 'confirmed')} className="bg-green-500 text-white p-1 mr-2">Confirmar</button>
                                                <button onClick={() => updateStatus(lead.id, 'rejected')} className="bg-red-500 text-white p-1">Rechazar</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

}