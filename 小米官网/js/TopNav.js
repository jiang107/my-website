//网络请求获取数据：fetch
let topNavData = []
fetch("../data/navList.json")
    .then(res => res.json())
    .then(data =>{
        renderNavBar(data);
    })

//视图渲染
function renderNavBar(data){
    const navBar = document.querySelector(".nav-bar ul");

    //清空现有内容
    navBar.innerHTML = "";

    //添加第一个特殊项 li
    const firstLi = document.createElement("li");
    firstLi.innerHTML = '<a href="#"><img src="./images/zzxsh.gif" alt=""></a>';
    navBar.appendChild(firstLi);

    // 动态生成其他列表项
    data.forEach((navItem,index) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${navItem.name}</a>`;

        //判断有没有子项
        if(navItem.list && navItem.list.length > 0){
            const navBarList = document.createElement("div");
            navBarList.className = "nav-bar-list";
            
            const wrap = document.createElement("div");
            wrap.className = "wrap";

            const ul = document.createElement("ul");
            
            navItem.list.forEach(product =>{
                const productLi = document.createElement("li");
                productLi.innerHTML = `
                    <a href="#">
                        <div class="img-box">
                            <img src="${product.img}" alt="">
                        </div>
                        <p class="name">${product.title}</p>
                        <p class="price">${product.price}起</p>
                    </a>
                `;
                ul.appendChild(productLi);
            })

            wrap.appendChild(ul);
            navBarList.appendChild(wrap);
            li.appendChild(navBarList);
        }
        navBar.appendChild(li);
    });
}