var json = {
    peoples: [{
        name: "Johny doe",
        occupation: "Web designer",
        hometown: "New york"
    }, {
        name: "Mark Davis",
        occupation: "Photographer",
        hometown: "Germany"
    }, {
        name: "Susan White",
        occupation: "Seo executive",
        hometown: "Greenland"
    }, {
        name: "Joseph Groce",
        occupation: "PHP developer",
        hometown: "Australia"
    }, {
        name: "Mohammad Wali",
        occupation: "Web developer",
        hometown: "India"
    }, {
        name: "Eddie Blom",
        occupation: "Web designer",
        hometown: "New york"
    }, {
        name: "John Anderson",
        occupation: "Graphic designer",
        hometown: "New york"
    }, {
        name: "Helen Nelson",
        occupation: "Web developer",
        hometown: "Australia"
    }]
};

function setData(peoples, issearch) {
    var issearch = (typeof issearch != "undefined") ? issearch : false;
    if (peoples.length > 0) {
        var data = "";
        for (var i = 0; i < peoples.length; i++) {
            person = peoples[i];
            list = "<li><span>Name: " + person.name + "</span>\
    <span>Occupation: " + person.occupation + "</span>\
    <span>Hometown: " + person.hometown + "</span>\
    </li>";
            data += list;
        }
    } else {
        data = "<li style='text-align:center'>Wopps, nothing found!</li>";
    }
    if (issearch === true) {
        $("#result_details").show().html((peoples.length) + " Results found (<a href='#' id='clear_search'>Clear search results</a>)")
    } else {
        $("#result_details").hide()
    }
    $("ul#list").html(data)
}
$.fn.highlight = function (word) {
    return this.html(function () {
        return $(this).text().replace(RegExp(word, 'gi'), '<mark>$&</mark>');
    });
};

function search(search_query, data) {
    var results = [];
    var searchby = $("form select[name=searchBy]").val() || "name";
    $.each(data, function (i, result) {
        if (result[searchby].search(new RegExp(search_query, "i")) != -1) {
            results.push(result);
        }
    });
    return results;
}
$("#search").submit(function (event) {
    event.preventDefault();
    search_query = $("form input[name=srch-term]").val();
    if ($.trim(search_query) !== "") {
        setData(search(search_query, json.peoples), true)
        $('ul li span').highlight(search_query);
    } else {
        alert("Pelse enter a search value! :)")
    }
})
$(document).on("click", "#clear_search", function (event) {
    event.preventDefault();
    $("#search")[0].reset();
    setData(json.peoples, false);
})
window.onload = function () {
    setData(json.peoples, false);
};