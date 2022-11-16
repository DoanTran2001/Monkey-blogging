import React from 'react'
import DashboardHeading from 'module/dashboard/DashboardHeading'
import UserTable from './UserTable';
import Button from 'components/button/Button';

function UserManage() {
  
  return (
    <div className="">
      <DashboardHeading title='Users' desc='Manage your user' />
      <div className="flex justify-end mb-10">
        <Button to="/manage/add-user" type='button' kind='ghost'>Add new user</Button>
      </div>
      <UserTable />
    </div>
  )
}

export default UserManage
