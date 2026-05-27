fetch("../data/nav.json")
    .then(res => res.json())
    .then(data => {
        renderSlideNav(data);
    })
    .catch(error =>{
        console.log(error);
    })

// 视图适配
function renderSlideNav(data){
    const slideUl = document.querySelector(".slide ul");

    //清空现有内容
    slideUl.innerHTML = "";
    // 动态生成slide导航项
    data.forEach((navItem,index)=>{
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${navItem.title}<i class="iconfont">&#xe62e;</i></a>`
        
        //如果有子列表，创建子列表
        if(navItem.list && navItem.list.length > 0){
            const slideList = document.createElement("div");
            slideList.className = "slide-list";
            
            const ul = document.createElement("ul");

            navItem.list.forEach(product =>{
                const productLi = document.createElement("li");
                productLi.innerHTML = `
                    <a href="#">
                        <img src="${product.img}" alt="">
                        <span>${product.name}</span>
                    </a>
                `;
                ul.appendChild(productLi);
            })

            slideList.appendChild(ul);
            li.appendChild(slideList);
        }
        slideUl.appendChild(li);
    });
}