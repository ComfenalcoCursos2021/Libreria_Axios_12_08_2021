
addEventListener("DOMContentLoaded", (e)=>{
    const validarArrays = (name, ...arg)=>{
        // console.warn(name);
            const fragmenDIV = new DocumentFragment();
            const div = document.createElement("DIV");
            div.className = "clearfix";
            let p;
        arg[0].forEach((valor,indice)=>{
            switch (name) {
                case 'abilities':
                    p = document.createElement("P");
                    p.className = "float-start";
                    p.innerText = valor.ability.name;
                    div.appendChild(p);
                    fragmenDIV.appendChild(div);
                    break;
                case 'forms':
                    p = document.createElement("P");
                    p.className = "float-start";
                    p.innerText = valor.name;
                    div.appendChild(p);
                    fragmenDIV.appendChild(div);
                    break;
                case 'game_indices':
                    p = document.createElement("P");
                    p.className = "float-start";
                    // p.innerText = valor.version.name;
                    p.innerText = "";
                    div.appendChild(p);
                    fragmenDIV.appendChild(div);
                    break;
                case 'held_items':
                    p = document.createElement("P");
                    p.className = "float-start";
                    p.innerText = valor;
                    div.appendChild(p);
                    fragmenDIV.appendChild(div);
                    break;
                case 'moves':
                    p = document.createElement("P");
                    p.className = "float-start";
                    // p.innerText = valor.move.name;
                    p.innerText = "";
                    div.appendChild(p);
                    fragmenDIV.appendChild(div);
                    break;
                case 'past_types':
                    p = document.createElement("P");
                    p.className = "float-start";
                    p.innerText = valor;
                    div.appendChild(p);
                    fragmenDIV.appendChild(div);
                    break;
                case 'stats':
                    p = document.createElement("P");
                    p.className = "float-start";
                    p.innerText = valor.stat.name;
                    div.appendChild(p);
                    fragmenDIV.appendChild(div);
                    break;
                case 'types':
                    p = document.createElement("P");
                    p.className = "float-start";
                    p.innerText = valor.type.name;
                    div.appendChild(p);
                    fragmenDIV.appendChild(div);
                    break;
                default:
                    break;
            }
        })
        return fragmenDIV;
    }
    const validarObject = (name, ...arg)=>{
        // console.warn(name);
            const fragmenDIV = new DocumentFragment();
            const div = document.createElement("DIV");
            div.className = "clearfix";
            let p;
        arg.forEach((valor,indice)=>{
            switch (name) {
                case 'species':
                    p = document.createElement("P");
                    p.className = "float-start";
                    p.innerText = valor.name;
                    div.appendChild(p);
                    fragmenDIV.appendChild(div);
                    break;
                case 'sprites':
                    for(let [id, name] of Object.entries(valor)){
                        let img = document.createElement("IMG");
                        if(name!=null && !(name instanceof Object)){
                            img.src = name;
                            div.appendChild(img);
                            fragmenDIV.appendChild(div);
                        }
                    }
                    break;
                default:
                    break;
            }
        })
        return fragmenDIV;
    }
    const crearData = (i,res) => {
        const fragmenTH = new DocumentFragment();
        fragmenTH.appendChild(document.createElement("TR"));
        const fragmenTD = new DocumentFragment();
        fragmenTD.appendChild(document.createElement("TR"));
        for(let [indice, value] of Object.entries(res)){
            if(i==2){
                let th = document.createElement('TH');
                th.innerText = indice;
                th.scope = "col";
                fragmenTH.children[0].appendChild(th);
            }
            if(Array.isArray(value)){
                let td = document.createElement('TD');
                td.appendChild(validarArrays(indice, value));
                fragmenTD.children[0].appendChild(td);
            }else if(value instanceof Object){
                let td = document.createElement('TD');
                td.appendChild(validarObject(indice, value));
                fragmenTD.children[0].appendChild(td);
            }else{
                let td = document.createElement('TD');
                td.innerText = value;
                fragmenTD.children[0].appendChild(td);
            }
            
        }
        document.querySelector("#encabezadosPokemon").appendChild(fragmenTH);
        document.querySelector("#datosPokemon").appendChild(fragmenTD);
    }
    const getPokemonId = async({...arg})=>{
        let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg.id}`);
        return pokemon.data;
    }
    let i = 1;
    var interval = setInterval(() => {
        getPokemonId({id: i}).then(res => {
            // console.log(res);
            crearData(i,res);
            
        })
        i++;
        if(!(i < 899)){
            clearInterval(interval);
        }
        
        // window.scroll(0, document.body.clientHeight);
    }, 50);

    
    setTimeout(() => {
        window.scroll(document.body.clientHeight, null);
    }, 2000);
    


    
    
    
    
    
    // let opciones = new Headers();
    // opciones.set('Content-Type', "application/json; charset: UTF-8");
    // axios.get("https://pokeapi.co/api/v2/pokemon/1",opciones).then((res)=>{
    //     console.log(res.data);
    // })




    // axios({
    //     method: "GET",
    //     url: "https://pokeapi.co/api/v2/pokemon/1"
    // }).then((res)=>{
    //     console.log(res.data);
    // })
})