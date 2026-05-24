const popupOverlay=document.getElementById('popupOverlay');
const buyButtons=document.querySelectorAll('.buy-btn');
const continueBtn=document.getElementById('continueBtn');
const loaderWrap=document.getElementById('loaderWrap');
const quizScreen=document.getElementById('quizScreen');
const cidadeText=document.querySelectorAll('.cidade-text');
const cidadeMain=document.getElementById('cidade');
const cepInput=document.getElementById('cepInput');

buyButtons.forEach(button=>{
button.addEventListener('click',()=>{
popupOverlay.style.display='flex';
});
});

cepInput.addEventListener('input',(e)=>{
let value=e.target.value.replace(/\D/g,'');
if(value.length>5){
value=value.replace(/(\d{5})(\d)/,'$1-$2');
}
e.target.value=value;
});

continueBtn.addEventListener('click',async()=>{

const cep=cepInput.value.replace(/\D/g,'');

if(cep.length<8){
alert('Digite um CEP válido');
return;
}

loaderWrap.style.display='flex';

try{

const response=await fetch(`https://viacep.com.br/ws/${cep}/json/`);
const data=await response.json();

setTimeout(()=>{

popupOverlay.style.display='none';

document.querySelector('.hero').style.display='none';
document.querySelector('.products').style.display='none';

quizScreen.style.display='block';

const cidade=data.localidade||'sua região';

cidadeMain.innerText=cidade;

cidadeText.forEach(item=>{
item.innerText=cidade;
});

window.scrollTo({
top:0,
behavior:'smooth'
});

},1500);

}catch(err){
alert('Erro ao localizar região');
}

});
