// Fonctions ajouter

const input_todo = document.querySelector("#input_ajout")
const btn_add = document.querySelector("#btn_ajout")
const ul_todo = document.querySelector("#ul_todo")

let nbr_li = 2
const lis = [
    ["li_1", document.querySelector("#li_1")],
    ["li_2", document.querySelector("#li_2")]
]

const supp_1 = document.querySelector("#btn_supp_1")
const supp_2 = document.querySelector("#btn_supp_2")
const btns_supp = [supp_1, supp_2]

const btn_todo_1 = document.querySelector("#todo_1")
const btn_todo_2 = document.querySelector("#todo_2")
const todo_finished = []
const todo_not_finished = [btn_todo_1, btn_todo_2]
const todos = [btn_todo_1, btn_todo_2]

btn_add.addEventListener("click", () => {
    nbr_li += 1
    const id_li = `li_${nbr_li}`

    const new_li = document.createElement("li")
    new_li.id = id_li
    const new_div_li = document.createElement("div")
    new_div_li.className = "li"

    const new_div_left = document.createElement("div")
    new_div_left.className = "li_left"
    const new_input = document.createElement("input")
    new_input.type = "checkbox"
    new_input.id = `todo_${nbr_li}`
    todos.push(new_input)
    SelectList()
    const new_p = document.createElement("p")
    new_p.textContent = input_todo.value 
    input_todo.value = ""
    new_p.className = "p_todo"
    new_p.id = `p_todo_${nbr_li}`


    const new_div_right = document.createElement("div")
    new_div_right.className = "li_right"
    const new_btn = document.createElement("button")
    new_btn.className = "poubelle"
    new_btn.id = `btn_supp_${nbr_li}`
    btns_supp.push(new_btn)
    btn_supp_select()
    console.log(btns_supp)
    const new_img = document.createElement("img")
    new_img.src = "poubelle.png"
    new_img.alt = "poubelle"
    new_img.className = "img_poubelle"


   
    ul_todo.append(new_li)
    new_li.append(new_div_li)

    new_div_li.append(new_div_left)
    new_div_left.append(new_input)
    new_div_left.append(new_p)

    new_div_li.append(new_div_right)
    new_div_right.append(new_btn)
    new_btn.append(new_img)


    lis.push([id_li, new_li])
})


// Supprimer 

const ul = document.querySelector("ul")

function btn_supp_select(){
    for (let i of btns_supp){
        i.addEventListener("click", () => {
            let number = i.id[i.id.length - 1]
            let element_supp = document.querySelector(`#li_${number}`)

            // Supprimer l'element dans toute les listes pour eviter les bugs

            let elementtt = document.querySelector(`#todo_${number}`)
            let index_supp = todos.indexOf(elementtt)
            todos.splice(index_supp, 1)

            if (todo_not_finished.includes(elementtt)){
                let index_supp = todo_not_finished.indexOf(elementtt)
                todo_not_finished.splice(index_supp, 1)
            }else{
                let index_supp = todo_finished.indexOf(elementtt)
                todo_finished.splice(index_supp, 1)
            }

            SelectList()

            element_supp.remove()
        })
    }
}

btn_supp_select()

// Selectionner

function SelectList(){
    for (let i of todos){
        if (i.checked == true){
            if (!todo_finished.includes(i)){
                todo_finished.push(i)
                
                if (todo_not_finished.includes(i)){
                    let index_i = todo_not_finished.indexOf(i)
                    todo_not_finished.splice(index_i, 1)
                }                
                
            }
        }else{
            if (!todo_not_finished.includes(i)){
                todo_not_finished.push(i)

                if (todo_finished.includes(i)){
                    let index_i = todo_finished.indexOf(i)
                    todo_finished.splice(index_i, 1)
                }
            }
        }
    }

    //console.log(todos, todo_finished, todo_not_finished)
}

const btn_toutes = document.querySelector("#btn_toutes")
btn_toutes.style.backgroundColor = "rgb(119, 119, 255)"
btn_toutes.style.color = "white"
const btn_a_faire = document.querySelector("#btn_a_faire")
const btn_faites = document.querySelector("#btn_faites")

btn_toutes.addEventListener("click", () => {
    SelectList()
    btn_toutes.style.backgroundColor = "rgb(119, 119, 255)"
    btn_toutes.style.color = "white"
    btn_a_faire.style.backgroundColor = "white"
    btn_a_faire.style.color = "rgb(119, 119, 255)"
    btn_faites.style.backgroundColor = "white"
    btn_faites.style.color = "rgb(119, 119, 255)"

    for (let i of todos){
        let nbr_id = i.id[i.id.length - 1]
        let id_element_parent_i = `#li_${nbr_id}`
        let parent = document.querySelector(id_element_parent_i)
        parent.hidden = false
    }
})

btn_a_faire.addEventListener("click", () => {
    SelectList()
    btn_a_faire.style.backgroundColor = "rgb(119, 119, 255)"
    btn_a_faire.style.color = "white"
    btn_toutes.style.backgroundColor = "white"
    btn_toutes.style.color = "rgb(119, 119, 255)"
    btn_faites.style.backgroundColor = "white"
    btn_faites.style.color = "rgb(119, 119, 255)"

    for (let i of todo_finished){
        let nbr_id = i.id[i.id.length - 1]
        let id_element_parent_i = `#li_${nbr_id}`
        let parent = document.querySelector(id_element_parent_i)
        parent.hidden = true
    }

    for (let i of todo_not_finished){
        let nbr_id = i.id[i.id.length - 1]
        let id_element_parent_i = `#li_${nbr_id}`
        let parent = document.querySelector(id_element_parent_i)
        parent.hidden = false
    }
})

btn_faites.addEventListener("click", () => {
    SelectList()
    btn_faites.style.backgroundColor = "rgb(119, 119, 255)"
    btn_faites.style.color = "white"
    btn_a_faire.style.backgroundColor = "white"
    btn_a_faire.style.color = "rgb(119, 119, 255)"
    btn_toutes.style.backgroundColor = "white"
    btn_toutes.style.color = "rgb(119, 119, 255)"

    for (let i of todo_finished){
        let nbr_id = i.id[i.id.length - 1]
        let id_element_parent_i = `#li_${nbr_id}`
        let parent = document.querySelector(id_element_parent_i)
        parent.hidden = false
    }

    for (let i of todo_not_finished){
        let nbr_id = i.id[i.id.length - 1]
        let id_element_parent_i = `#li_${nbr_id}`
        let parent = document.querySelector(id_element_parent_i)
        parent.hidden = true
    }
})