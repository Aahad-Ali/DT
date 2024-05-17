import UseGetHook from 'Hooks/UseGetHook';
import React, { useEffect } from 'react'

const UserPermission = () => {
    const { FetchUserRole, role } = UseGetHook("getAllUserRole");
    const ROLE = role?.filter(e => e?.role.includes(localStorage.getItem("user_role")));
    console.log(ROLE, "ROLESS")
    useEffect(() => {
        FetchUserRole()
    }, [])
    return {
        FetchUserRole,
        role,
        ROLE,
    }
}

export default UserPermission
