async function changeLang(lang){
    if (lang == 'en' || URL == '/main'){
        document.getElementById('lang').className = 'fi fi-gb';
        window.location.href = '/main/';
    }else{
        document.getElementById('lang').className = 'fi fi-ru';
        window.location.href = '/main/ru';
        photoUrl = photoData.urls.regular;
    }
}