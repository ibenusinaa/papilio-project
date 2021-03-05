import React from 'react'


export default class Footer extends React.Component{
    render(){
        return(
            <div>
                <div style={{backgroundColor: '#dedede'}}>
                    <div className ='container'>
                        <div className ='row'>
                            <p className ="funniture-font-bold mt-3">Toko Furniture Online, Solusi Untuk Kebutuhan Furniture Minimalis &amp; Modernmu</p>
                            <p>
                            Saat membeli furniture minimalis ataupun modern, ada beberapa hal yang sering kita khawatirkan. 
                            Mulai dari barang yang kurang cocok, lokasi toko yang jauh, hingga masalah harga. Melihat kekhawatiran tersebut, 
                            toko mebel online papilio.com hadir. Di era internet seperti saat ini, 
                            membeli furniture secara online adalah hal yang sudah lumrah dan sangat mudah dilakukan. 
                            Membeli furniture minimalis atau modern tinggal dalam beberapa ketukan jari dan lagi toko furniture online 
                            sudah sangat dengan mudah dikunjungi melalui website. Dari sekian banyak toko mebel online,
                            yang memiliki kualitas dan desain yang menarik adalah papilio.com, 
                            sebuah toko furniture online yang berfokus pada loose furniture rumah minimalis, 
                            modern dan perencanaan serta pengerjaan desain interior baik itu untuk rumah, apartemen, hingga kantor.
                            </p>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className='bg-light d-none d-md-block'>
                    <div className='container d-flex align-items-center' style={{height: '300px'}}>
                        <div className='col-3 mt-5 ml-n4' style={{height: '280px', width: '570px'}}>
                            <div className = 'funniture-font-bold funniture-font-size-24 mb-3'>
                                Papilio
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                Tentang kami
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                Papilio Projects
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                Promo Papilio Projects
                            </div >
                            <div className = 'funniture-font-size-16 mb-1'>
                                Blog
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                Filosofi Papilio
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                Karir
                            </div>
                        </div>
                        <div className='col-3 mt-5' style={{height: '280px', width: '570px'}}>
                            <div className = 'funniture-font-bold funniture-font-size-20 mb-3 mt-1'>
                                Layanan Pelanggan
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                FAQ
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                Kebijakan Privasi
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                Syarat dan Ketentuan
                            </div >
                            <div className = 'funniture-font-size-16 mb-1'>
                                Kebijakan Pengiriman
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                Kebijakan Pengembalian
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                Lokasi Kota Pengiriman
                            </div>
                        </div>
                        <div className='col-3 mt-5' style={{height: '280px', width: '570px'}}>
                            <div className = 'funniture-font-bold funniture-font-size-20 mb-3 mt-2'>
                                Kontak Kami
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                +6282260333593
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                (021)50820022
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                hello@papilio.com
                            </div >
                            <div className = 'funniture-font-size-16 mb-1'>
                                Senin - Minggu / 10.00 - 20.00
                            </div>
                            <div className = 'funniture-font-size-16 mb-1'>
                                (Termasuk Hari Libur)
                            </div>
                        </div>
                        <div className='col-3 mt-5' style={{height: '280px', width: '570px'}}>
                            <div className = 'funniture-font-bold funniture-font-size-16 mb-3 mt-2'>
                                Daftar &amp; Dapatkan Voucher Diskon Rp50.000
                            </div>
                            <div className='input-group'>
                                <input type="email" className="form-control" placeholder="Alamat Email" />
                                <div className='input-group-append ml-2'>
                                    <input type="button" value="Daftar" className="btn btn-warning" />
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}