fetch("../data/appliance.json")
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        renderAppliance(data);
    })
    .catch(error =>{
        console.log(error);
    })

function renderAppliance(data){
    if(!data || data.length === 0) return;

    const applianceData = data[0];

    // 左侧封面
    const elcLeft = document.querySelector(".elc-left");
    if(elcLeft && applianceData.covers){
        elcLeft.innerHTML = "";
        applianceData.covers.forEach(cover =>{
            const elcItem = document.createElement("div");
            elcItem.className = "item elc-item";
            elcItem.innerHTML = `
                <a href="#">
                    <img src="${cover.img}" alt="">
                </a>
            `;
            elcLeft.appendChild(elcItem);
        });
    };

    // 右侧列表
    const elcRight = document.querySelector(".elc-right");
    if(elcRight && applianceData.list){
        elcRight.innerHTML = "";
        // 列表生成7个产品
        applianceData.list.forEach((product) =>{
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";
            itemDiv.innerHTML = `
                <a href="#">
                    <img class="item-img" src="${product.img}" alt="">
                    <p class="item-name">${product.title}</p>
                    <p class="item-desc">${product.desc}</p>
                    <p class="item-price">${product.price}起</p>
                </a>
            `;
            elcRight.appendChild(itemDiv);

        })

        // 添加剩余模块
        const elcBox = document.createElement("div");
        elcBox.className = "elc-box";
        elcBox.innerHTML = `
            <div class="item-last">
                <div></div>
                <div></div>
            </div>
        `;
        elcRight.appendChild(elcBox);
    }
}