import React from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { FaUsers } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function AllUsers() {
    const navigate = useNavigate();

    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const userId = loggedUser.id;
    //console.log(userId)
    const users = JSON.parse(localStorage.getItem('allUsers')) || [];

    return (
        <Container className='mt-4'>

            {users.length === 0 ? (
                <>
                    <div className='text-center'>
                        <FaUsers size={80} color="gray" className="mb-4" />
                        <h3 className="text-muted">No Users Found</h3>
                        <p className="text-secondary">No users are registered yet!</p>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="pb-3 text-center">All Users</h3>
                    <Table bordered hover size="sm" className="table-sm">
                        <thead>
                            <tr>
                                <th className="text-center p-1">Name</th>
                                <th className='text-center p-1'>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {

                                return (

                                    <tr key={index} className="align-middle">
                                        <td className="text-center p-1">{user.name}</td>
                                        <td className="text-center p-1">{user.email}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    )
}

export default AllUsers