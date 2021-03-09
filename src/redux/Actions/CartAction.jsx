import axios from 'axios'

export const getDataCart = (idProduct, idUser, quantity) =>{
    console.log(idProduct, idUser, quantity)
    return(dispatch) => {
             // cek dulu pakai get
        axios.get(`http://localhost:2000/carts?idProduct=${idProduct}`)
        .then((res) => {
            if(res.data.length === 0){ //kalau ga ada post     
                axios.post('http://localhost:2000/carts/', {idProduct: idProduct, idUser: idUser, quantity: quantity})
                .then((res)=> {
                    axios.get(`http://localhost:2000/carts?idUser=${idUser}`)
                    .then((res) => {
                        console.log(res.data)
                        dispatch({
                            type: 'GET_DATA_SUCCESS',
                            payload: res.data
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{ // kalau ada kita patch ajaa
                let qtyOnDb = res.data[0].quantity //buat nyari tau qty item yang di db ada berapa
                let idProdOnDb = res.data[0].id //buat nyari tau dia id nomer berapa di db carts
                axios.patch(`http://localhost:2000/carts/${idProdOnDb}`, {quantity: qtyOnDb + 1 }) //cara patch harus ada idnya
                .then((res)=>{
                    axios.get(`http://localhost:2000/carts?idUser=${idUser}`)
                    .then((res) => {
                        console.log(res.data)
                        dispatch({
                            type: 'GET_DATA_SUCCESS',
                            payload: res.data
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                })
                .catch((err)=>{

                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
        
