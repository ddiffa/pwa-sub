document.addEventListener("DOMContentLoaded", function(){
    if("serviceWorker" in navigator){
        window.addEventListener("load",function(){
    
          registerSW();


        });


    }else{
        console.log("ServiceWorker belum didukung browser ini, silahkan ganti browser");
    }
    if("Notification" in window){
        requestPermission();
    }else{
        console.log("Browser tidak mendukung notifikasi");
    }
})

function registerSW(){
    navigator.serviceWorker
    .register("/sw.js")
    .then(function(){
        console.log("Pendaftaran serviceWorker berhasil");
    })
    .catch(function(){
        console.log("Pendaftaran serviceWorker Gagal");
    });
}

function requestPermission() {
    Notification.requestPermission().then(result => {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }

        console.log("Fitur notifikasi diijinkan.");
    });

    if (('PushManager' in window)) {
        console.log("PushManager exist!") ; 

        navigator.serviceWorker.getRegistration().then(register =>{
            register.pushManager.subscribe({
                userVisibleOnly: true, 
                applicationServerKey: urlBase64ToUint8Array("BP52sNUV-cbypENR_fNphX7INY6VAmvdLspMLDnP5hfWL2FKXaEfJAz-eF6UsYoj4peL4LkCLZ_jklvAywjnQHU")
            }).then(subscribe =>{
                console.log("Berhasil melakukan subscribe dengan endpoint: " + subscribe.endpoint) ; 
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(function(e) {
                console.error('Tidak dapat melakukan subscribe ', e.message);
            });
        })
    }
}

function urlBase64ToUint8Array(base64String){
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    console.log("app : ", outputArray);
    return outputArray;
}