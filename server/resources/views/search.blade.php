<html>
<body>


<!-- <form action="{{url('/search/1500')}}" method="post">
@csrf
    <input type="search" name="search">
    <button type="submit">Search</button>
</form> -->


<form action="{{url('/search/1500')}}" method="get">     
    <input type="search" name="search">
    <button type="submit">Search</button>
</form>



</body>
</html>

