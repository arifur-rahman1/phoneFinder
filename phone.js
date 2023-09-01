const loadPhone= async (serchText,isShowAll)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${serchText}`)
    const data= await res.json();
    const phones=data.data;
   displayPhone(phones,isShowAll)
}

const displayPhone =(phones,isShowAll)=>{
    const cardContainer=document.getElementById('cardContainer');
    cardContainer.textContent='';

    const showAllContainer=document.getElementById('showAll')

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    

    if (!isShowAll) {
        phones=phones.slice(0,12)
    }
  
    phones.forEach(phone => {
        const phoneCard=document.createElement('div');
        phoneCard.classList=`card bg-base-100 shadow-xl`;
        phoneCard.innerHTML=` <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button class="btn btn-primary" onclick="showDetails('${phone.slug}');" >Show details</button>
        </div>
      </div>`
        cardContainer.appendChild(phoneCard);
    });
    toggleLoader(false)
}
const handleSearch=(isShowAll)=>{
    toggleLoader(true);
const input=document.getElementById('inputSearch');
const serchText=input.value;
loadPhone(serchText,isShowAll);
// input.value='';

}
// enter key for search 
document.getElementById("inputSearch").addEventListener('keyup',function(event) {
    event.preventDefault;
    if(event.keyCode===13){
        document.getElementById('searchBtn').click();
    }
       
    
})

const toggleLoader = (isLoading)=>{
    const loadeing=document.getElementById('loader');
    if(isLoading){
        loadeing.classList.remove('hidden')
    }
    else{
        loadeing.classList.add('hidden')
    }
}

const handleShowAll = ()=>{
    handleSearch(true);
}

const showDetails= async(id)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data= await res.json();
   const phone =data.data;
   showPhoneDetails(phone)
   console.log(phone)


}   

const showPhoneDetails=(phone)=>{
    my_modal_5.showModal();
    const showDetaile=document.getElementById('showDetaileContainer');
    showDetaile.innerHTML=`
    <figure><img src=${phone.image} alt="Shoes" /></figure>
    
    <div class="card-body" >
    <h2 class="card-title">${phone.name}</h2>
    <p><span class='text-xl font-semibold'>Storage: ${phone.mainFeatures?.storage}</span></p>
    <p><span>GPS: ${phone?.others?.GPS}</span></p>
    </div>
   
    `
   

}
