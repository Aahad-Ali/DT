import React from 'react'
import { useLocation } from 'react-router-dom';

const UseUrlParamsHook = () => {
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const name = new URLSearchParams(search).get("name");
    const email = new URLSearchParams(search).get("email");
    const token = new URLSearchParams(search).get("token");
    const role = new URLSearchParams(search).get("role");
    const interval = new URLSearchParams(search).get("interval");
    const property_id = new URLSearchParams(search).get("property");
    const planName = new URLSearchParams(search).get("planName");
    const price = new URLSearchParams(search).get("price");
    const ssn = new URLSearchParams(search).get("ssn");
    const paid = new URLSearchParams(search).get("paid");
    return {
        id,
        property_id,
        name,
        email,
        token,
        role,
        interval,
        planName,
        price,
        ssn,
        paid
    }
}
export default UseUrlParamsHook
