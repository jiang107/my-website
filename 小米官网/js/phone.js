fetch("../data/phone.json")
    .then(res =>res.json())
    .then(data =>{
        renderPhone(data);
    })
    .catch(error =>{
        console.log(error);
    })

function renderPhone(data){
    if(!data || data.length === 0) return;

    // 获取数据
    const phoneData = data[0];

    // 更新左侧大图
    const phoneBoxLeft = document.querySelector(".phone-box-left img");
    if(phoneBoxLeft && phoneData.cover){
        phoneBoxLeft.src = phoneData.cover;
    }

    // 更新右侧产品列表
    const phoneBoxRight = document.querySelector(".phone-box-right");
    if(phoneBoxRight && phoneData.list){
        phoneBoxRight.innerHTML = "";

        phoneData.list.forEach((product) =>{
            itemDiv = document.createElement("div");
            itemDiv.className = "item";
            itemDiv.innerHTML = `
                <a href="#">
                    <img class="item-img" src="${ product.img }" alt="">
                    <p class="item-name">${product.title}</p>
                    <p class="item-desc">${product.desc}</p>
                    <p class="item-price">${product.price}起</p>
                </a>
            `;

            phoneBoxRight.appendChild(itemDiv);
        })
    }
}