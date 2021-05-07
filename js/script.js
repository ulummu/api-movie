function searchMovie(){
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'b087976d',
            's': $('#search-input').val()
        },
        success: function(result){
            if(result.Response == "True"){
                let movies = result.Search;
    
                $.each(movies, function(i,data){
                    $('#movie-list').append(`
                    <div class="col-md-3"
                        <div class="card mb-3">
                        <img src="`+data.Poster+`" class="card-img-top" alt="`+data.Title+`">
                            <div class="card-body">
                                <h5 class="card-title">`+data.Title+`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                <h6 class="card-subtitle mb-2 text-muted">`+data.Type+`</h6>
                                <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+data.imdbID+`">See detail</a>
                            </div>
                        </div>
                    </div>
                    `);
                })
    
                $('#search-input').val('');
            }else{
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">`+ result.Error +`</h1>
                    </div>
                `)
            }
        }
    });
}

$('#search-button').on('click', function(){
    searchMovie();
});

$('#search-input').on('keyup', function(e){
    if (e.keyCode == 13) {
        searchMovie();
    }
}
)

$('#movie-list').on('click','.see-detail', function(){
    console.log($(this).data('id'));

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': 'b087976d',
            'i': $(this).data('id')
        },
        success: function(movie){
            if(movie.Response == "True"){
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                        <img src="`+movie.Poster+`"class="img-fluid">
                        </div>

                        <div class="col-md-8">
                        <ul class="list-group">
                        <li class="list-group-item"><h4>`+movie.Title+`</h4></li>
                        <li class="list-group-item"><h5>`+movie.Year+`</h5></li>
                        <li class="list-group-item"><h5>`+movie.Genre+`</h5></li>
                        <li class="list-group-item"><h5>`+movie.Director+`</h5></li>
                        <li class="list-group-item"><h5>`+movie.Actors+`</h5></li>
                        <li class="list-group-item"><p>`+movie.Plot+`</p></li>
                        </ul>
                        </div>
                    
                `)
            }
        }
    })
})