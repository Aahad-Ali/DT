import { message } from 'antd';
// BaseUrl
const config = require("../Helpers/config.json");
const BulkDelete = (url, id, fetchProperty) => {
    const bulkDelete = async () => {
        for (let i of id) {
            await fetch(`${config['baseUrl']}/api/${url}/${i}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => {
                return res.json()
            }).then((res) => {
                if (res.apiCallStatus === "success") {
                    fetchProperty()
                    console.log(res)
                } else {
                    const docs = res.relatedDocs
                    const docsType = Object.entries(docs).map(e => e[1].length + " " + e[0]);
                    message.error(`You cannot delete this you have ${docsType} connected to this property`)
                }
            })
        }

    }
    return {
        bulkDelete
    }
}

export default BulkDelete
