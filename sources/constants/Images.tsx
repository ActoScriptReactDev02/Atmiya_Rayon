const ImagePath = '../assets/Images/';
const Iconepath = '../assets/Icone/'
const png = '.png';

const Images ={
    Logo: require(ImagePath + 'Logo'+png),
    User: require(Iconepath+'user'+png),
    pwicon:require(Iconepath + 'pwicon'+png),
    pw_show:require(Iconepath +'pw_show'+png),
    pw_hide:require(Iconepath+ 'pw_hide' + png),
    notification:require(Iconepath + 'notification'+png),
    backarrow:require(Iconepath + 'backarrow' + png),
    mapicon:require(ImagePath + 'mapicon'+png),
    close:require(Iconepath + 'close' +png),
    gallery:require(Iconepath + 'gallery' + png),
    date:require(Iconepath + 'date' + png),
    camera:require(Iconepath + 'camera' + png),
    calendar:require(Iconepath+'calendar' + png),
    Edit:require(Iconepath + 'edit' + png),
    loaction:require(Iconepath + 'loaction' + png),
    Splashimage:require(ImagePath + 'SplashScreen' + png),
    cityicone:require(Iconepath + 'cityicone' + png),
    driving: require(Iconepath + 'driving' + png),
    errorIcone:require(Iconepath + 'error' + png),
    successicone:require(Iconepath + 'success' + png),
    Profile:require(Iconepath + 'Profile' + png),
    logoutimage:require(ImagePath + 'logout' + png)
}

export default Images