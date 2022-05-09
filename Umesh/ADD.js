console.log("This is my js file");

//Intialize the new parameter
let source = 'bbc-news';
let apiKey = '34ddef521eb64491886c85ec62d6ecd0'

//grab the news container
let multiCollapseExample1 = document.getElementById('multiCollapseExample1');

//create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

//what to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        let newsHtml = '';
        articles.forEach(function(element) {
            console.log(element['title'])
            let news = `
        <div class="row mt-2">        
                            <div class="col mb-4">
                                <div class="collapse multi-collapse" id="multiCollapseExample1"> 
                                <div class="card">
                                <div class="card-header">
                                <h3>${element['title']}</h3>
                              
                                </div>                               
                                    <div class="card-body">                                 
                                  
                                    ${element['description']}..  <a href=${element['url']} target="_blank">Read More</a> </div>
                                </div>
                            </div>
                            </div>

                        </div>`
            newsHtml += news;
        });
        document.getElementById('multiCollapseExample1').innerHTML = newsHtml;
       // document.getElementById('dvaccordian').innerHTML = newsHtml;

    }
    else {
        console.log('Some error occured')
    }
}

xhr.send()


