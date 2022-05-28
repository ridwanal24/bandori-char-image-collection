const collector = []
let isLoading = false
const btnScrap = document.querySelector('.btn-scrap')


async function scrap() {
    let response = await fetch("https://bandori.party/api/members")
    response = await response.json()
    let total = response.count
    for (let i = 0; i < Math.ceil(total / 10); i++) {
        // for (let i = 0; i < 2; i++) {
        response = await fetch(`https://bandori.party/api/members/?page=${i + 1}`)
        response = await response.json()
        response.results.map(item => collector.push(item))
        console.log('loading page ' + i)
    }

    btnScrap.innerHTML = 'Scrap Card'
    isLoading = false
    btnScrap.disabled = false
    console.log(collector)

    let a = document.createElement("a");
    let file = new Blob([JSON.stringify(collector)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'bandori_member.json';
    a.click();

}

btnScrap.addEventListener('click', function (e) {
    if (!isLoading) {
        scrap()
        this.disabled = true
        this.innerHTML = ` <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> Please Wait`
        isLoading = true
    }
})
