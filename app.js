const selectBand = document.querySelector('[name="band"]')
const selectCharacter = document.querySelector('[name="character"]')

const cards = []
let members = []
let members_filtered = []

let bands = []

let image_and_trained_list = []
let image_and_trained_list_filtered = []

async function main() {
    // get member detail from data json
    let member_res = await fetch('./bandori_member.json')
    members = await member_res.json()

    // get bands name
    bands = members.map(item => item.i_band)
    bands = Array.from(new Set(bands))

    // get card from data json
    let card_res = await fetch('./bandori_card.json')
    card_res = await card_res.json()

    // add card to card list
    card_res.map(async item => {
        let char_name = members.filter(member => member.id === item.member)[0].name
        let band = members.filter(member => member.id === item.member)[0].i_band

        cards.push({ id: item.id, card_name: item.name, char_name: char_name, art: item.art, art_trained: item.art_trained, transparent: item.transparent, transparent_trained: item.transparent_trained, i_attribute: item.i_attribute, band: band })
    })


    // filter all image
    cards.map(item => {
        image_and_trained_list.push({ image: item.art, card_id: item.id, char_name: item.char_name, i_attribute: item.i_attribute, band: item.band })
        image_and_trained_list.push({ image: item.art_trained, card_id: item.id, char_name: item.char_name, i_attribute: item.i_attribute, band: item.band })
        image_and_trained_list.push({ image: item.transparent, card_id: item.id, char_name: item.char_name, i_attribute: item.i_attribute, band: item.band })
        image_and_trained_list.push({ image: item.transparent_trained, card_id: item.id, char_name: item.char_name, i_attribute: item.i_attribute, band: item.band })
    })
    image_and_trained_list = image_and_trained_list.filter(item => item.image != null)
    drawListBandFilter()
    drawListCharacterFilter()
    drawList()

}

function drawList() {
    text = ''

    filterImage()

    image_and_trained_list_filtered.map(item => {
        text += `<div class="col-3 text-center">
        <a href="https://bandori.party/card/${item.card_id}/${item.char_name.split(' ').join('-')}-${item.i_attribute}/">
        <img class="img-fluid" loading="lazy" src="${item.image}" alt="${item.char_name}">
        </a>
        </div>`
    })

    document.querySelector('.image-list').innerHTML = text
}

function filterImage() {

    if (selectBand.value == 'all') {
        image_and_trained_list_filtered = image_and_trained_list
    } else {
        image_and_trained_list_filtered = image_and_trained_list.filter(item => item.band == selectBand.value)
    }


    if (selectCharacter.value != 'all') {
        image_and_trained_list_filtered = image_and_trained_list_filtered.filter(item => item.char_name == selectCharacter.value)
    }
}


// draw Filter Option
function drawListBandFilter() {
    text = ''

    text += `<option value="all">All Band</option>`
    bands.map(item => {
        text += `<option value="${item}">${item}</option>`
    })
    selectBand.innerHTML = text
}

function drawListCharacterFilter() {

    text = ''
    text += '<option value="all">All Character</option>'
    members_filtered.map(item => {
        text += `<option value="${item.name}">${item.name}</option>`
    })
    selectCharacter.innerHTML = text
}
// ==================================

selectBand.addEventListener('change', e => {
    members_filtered = members.filter(item => item.i_band == selectBand.value)
    drawListCharacterFilter()
    drawList()
})

selectCharacter.addEventListener('change', e => {
    drawList()
})

main()