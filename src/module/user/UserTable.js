import ActionDelete from 'components/action/ActionDelete';
import ActionEdit from 'components/action/ActionEdit';
import Table from 'components/table/Table';
import { db } from 'firebase-app/firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { userRole, userStatus } from 'utils/constants';
import LabelStatus from 'components/label/LabelStatus'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Tooltip from 'components/Tooltip/Tooltip';

function UserTable() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, snapshot => {
      let result = [];
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setUserList(result);
    })
  }, []);
  const renderLabelRole = (role) => {
    switch(role) {
      case userRole.USER: 
        return "User";
      case userRole.MOD:
        return "Moderator";
      case userRole.ADMIN:
        return "Admin";
      default:
        break;
    }
  }
  const renderLableStatus = (status) => {
    switch(status) {
      case userStatus.ACTIVE: 
        return <LabelStatus type='success'>Active</LabelStatus>
      case userStatus.PENDING:
        return <LabelStatus type='warning'>Pending</LabelStatus> 
      case userStatus.BAN: 
        return <LabelStatus type='danger'>Rejected</LabelStatus>
      default:
        break;
    }
  }
  const handleEditUser = (id) => {
    // console.log(id);
    navigate(`/manage/update-user?id=${id}`);
  }
  const handleDeleteUser = async (user) => {
    console.log(user);
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // await deleteUser(user); // Delete trong auth;
        await deleteDoc(colRef); // Delete trong collection. 
        toast.success("Delete user successfully");
        Swal.fire("Deleted", "Category has been deleted", "success");
      }
    });
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            userList.length > 0 && userList.map(user => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 4) + "..."}</td>
                <td className='whitespace-nowrap'>
                  <div className="flex items-center gap-x-3">
                    <img src={user?.avatar} className='w-10 h-10 object-cover rounded-md flex-shrink-0' alt="" />
                    <div className="flex-1" >
                      <h3>{user.fullname}</h3>
                      <time className='text-sm text-gray-400'>{new Date(user?.createdAt?.seconds * 1000).toLocaleDateString('vi-VI')}</time>
                    </div>
                  </div>
                </td>
                <td>{user?.username}</td>
                <td className=''>
                  <Tooltip text={`${user?.email?.slice(0,5)}...`}>
                    {`${user?.email}`}
                  </Tooltip>
                </td>
                <td>{renderLableStatus(user?.status)}</td>
                <td>{renderLabelRole(user?.role)}</td>
                <td className='flex items-center gap-x-3'>
                  <ActionEdit onClick={() => handleEditUser(user.id)}/>
                  <ActionDelete onClick={() => handleDeleteUser(user)}/>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default UserTable
