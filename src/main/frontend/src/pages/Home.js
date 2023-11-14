import React, { useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Home = () => {

    const [users, setUsers] = React.useState([]);

    const {id} = useParams()

    useEffect(() => {
        loadUsers();
    },[]);

    const loadUsers = async () => {
        const result=await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    };

    const deleteUser=async(id)=>{
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers();
    }

    return (
        <div className='container' style = {{ marginTop: '5%'}}>
            <div className='table-responsive'>
                <table className="table border shadow">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">View / Edit / Delete</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={user.id}> {/* 고유한 key 값을 사용 (예: user의 id) */}
                                <th scope="row">{index + 1}</th> {/* index를 이용하여 순번 표시 */}
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-primary mx-2"
                                          to={`/viewuser/${user.id}`}
                                    >View</Link>
                                    <Link className="btn btn-outline-primary mx-2"
                                          to={`/edituser/${user.id}`}
                                    >Edit
                                    </Link>
                                    <button className="btn btn-danger mx-2"
                                          onClick={()=>deleteUser(user.id)}
                                    >Delete</button>

                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;