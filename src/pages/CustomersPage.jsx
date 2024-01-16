import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import customersAPI from "../services/customersAPI";

const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([])

    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
        }catch(error)
        {
            //notif a faire 
            console.error(error.response)
        }
    }

    //Pour la pagination
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        fetchCustomers()
    },[customers])

    //pour la pagination
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const itemsPerPage = 10

    const paginatedCustomers = Pagination.getData(customers, currentPage, itemsPerPage)
    
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
                {paginatedCustomers.map(customer=>(
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
            <Pagination 
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={customers.length}
                onPageChanged={handlePageChange}
            />
        </>
     );
}
 
export default CustomersPage;