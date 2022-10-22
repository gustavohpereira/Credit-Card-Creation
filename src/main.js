import "./css/index.css"
import IMask from "imask"


// Alteração da cor do cartão
const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')


const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
// alteração logo
    const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")



function setCardType(type){
    const colors = {
        'Visa': [ "#436D99", "#2D57F2"] , 
        'Mastercard' : ["#DF6F29","#C69347"],
        'Default': ["black","gray"],

    }
    
    ccBgColor01.setAttribute('fill', colors[type][0]),

    ccBgColor02.setAttribute('fill', colors[type][1])
    ccLogo.setAttribute('src' , `../public/cc-${type}.svg`)


}
globalThis.setCardType = setCardType


const inputCVC = document.querySelector('#security-code')
const securityCodePattern = {
    mask:'0000'
}
const securityCodeMasked = IMask(inputCVC,securityCodePattern)


const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
    mask:'MM{/}YY',
    blocks:{
        MM: {
            mask: IMask.MaskedRange,
            from: 1 ,
            to: 12

        },
        YY:{
            mask: IMask.MaskedRange,
            from: 22,
            to: 32
        }
    },
}
const expirationDateMasked = IMask(expirationDate,expirationDatePattern)

const CardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
    mask: [
        {
        mask: "0000 0000 0000 0000",
        regex:/^4\d{0,15}/,
        cardtype: 'Visa'
        },
        {
            mask: "0000 0000 0000 0000", 
            regex:/(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,2}/,
            cardtype: 'Mastercard'
        },
        {
            mask: "0000 0000 0000 0000", 
            cardtype: 'Default'
        }
    ],
 dispatch: function(appended, dynamicMasked){
     var number = (dynamicMasked.value + appended).replace(/\D/g,'');
     const foundMask = dynamicMasked.compiledMasks.find(function(item){
        return number.match(item.regex)
     })
     

     return foundMask
 } 



}
const CardNumberMasked = IMask(CardNumber,cardNumberPattern)




const addButton = document.querySelector('#botão_adicionar')
addButton.addEventListener('click',() => {
    console.log('clicou')

})
document.querySelector('form').addEventListener('submit',(event) =>{
    event.preventDefault()
})

const CardHolder = document.querySelector('#card-holder')
CardHolder.addEventListener('input', () =>{
    const ccHolder = document.querySelector('.cc-holder .value')
    ccHolder.innerText = CardHolder.value.length === 0 ? "Fulano da silva" : CardHolder.value

})

securityCodeMasked.on("accept",() =>{

  updateSecurityCode(securityCodeMasked.value)
    

})


function updateSecurityCode(code){
    const ccSecurity = document.querySelector('.cc-security .value')
    ccSecurity.innerText = code.length === 0 ? "123" : code
    
}

CardNumberMasked.on('accept',() => {
    const cardType = CardNumberMasked.masked.currentMask.cardtype
    setCardType(cardType)
    updateCardNumber(CardNumberMasked.value)

})
function updateCardNumber(number){

    const ccNumber = document.querySelector('.cc-number')
    ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

expirationDateMasked.on("accept", () => {
   updateExpirationDate(expirationDateMasked.value)
    
})
function updateExpirationDate(expiration){
     const ccExpiration = document.querySelector('.cc-expiration .value')
     ccExpiration.innerText = expiration.length === 0 ? '02/32' : expiration
}




 
