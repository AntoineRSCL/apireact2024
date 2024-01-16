import { useState, useEffect } from "react";
import Axios from "axios";

const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([])

    useEffect(()=>{
        Axios.get('http://apicourse.myepse.be/api/customers')
            .then(response => response.data['hydra:member'])
            .then(data => setCustomers(data))
            .catch(error => console.error(error.response))
    },[])
    
    return ( 
        <>
            <h1>Liste des clients</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th>Factures</th>
                        <th className="text-center">Montant Total</th>
                        <th className="text-center">Montant Restant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {customers.map(customer=>(
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.firstName} {customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">
                            <span className="badge badge-secondary">
                                {customer.invoices.length}
                            </span>
                        </td>
                        <td className="text-center">
                            {customer.totalAmount.toLocaleString()}€
                        </td>
                        <td className="text-center">
                            {customer.unpaidAmount.toLocaleString()}€
                        </td>
                        <td>
                            <button className="btn btn-sm btn-danger">Supprimer</button>
                        </td>

                    </tr>
                ))}
            </tbody>
            </table>
        </>
     );
}
 
export default CustomersPage;