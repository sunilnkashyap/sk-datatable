$(document).ready(function () {

    var tableId = 'example';
    var datatable = $('#' + tableId).DataTable({
        "paging": true,
        "lengthMenu": [10, 25, 50, 100, 200, 250, 500],
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "dom": 'Bfrtip',
        "oLanguage": {
            "sSearch": "",
            "sLengthMenu": "Per page _MENU_",
            "oPaginate": {
                "sNext": "<i class='ski-chevron-right'></i>",
                "sPrevious": "<i class='ski-chevron-left'></i>"
            },
            "sInfo": "_START_ to _END_ rows out of _TOTAL_",
            "sInfoFiltered": "<br/><small>( filtering from _MAX_ records )</small>"

        },
        "sDom": '<"wrapper"<"row"<"col-sm-12" <"col-sm-8 actionButtonsDiv"> <"col-sm-4 printBtnDiv" B > <"col-sm-12" <"sk-progress" <"sk-blue sk-progressfull skl">><"row well customWell" <"col-sm-4 customSearchInput" f> <"col-sm-2 skDtFilterBtn" l>  <"col-sm-3" i> <"col-sm-3 skDtCustomPagination" p> > > >  >rt<"clear">>',
        initComplete: function () {
            var inputHtml = '<div class="input-group">' +
                    '<input type="text" placeholder="Contains..." data-focus="true" class="form-control DatatableAllRounderSearch" />' +
                    '<span class="input-group-addon cursorPointer" data-action="clearSearch"> ' +
                    '<i class="ski-cancel-circle"></i>' +
                    '</span>' +
                    '<span class="input-group-addon cursorPointer"> ' +
                    '<i class="ski-search"></i>' +
                    '</span>' +
                    '</div>';

            $(".customSearchInput").html(inputHtml);

            $(".skDtFilterBtn").append('<button data-toggle="tooltip" title="Filters" type="button" class="btn btn-primary skDtfilterToggle"><i class="ski-filter"></i></button>');


            var searchoptions = $("#" + tableId + " thead tr:eq(0) th");
            var customfilterinputs = '<tr style="display:none">';
            for (var j = 0; j < searchoptions.length; j++) {
                customfilterinputs += '<th></th>';
            }
            customfilterinputs += '</tr>';
            $("#" + tableId + " thead").append(customfilterinputs);
            var colIndex = 0;
            this.api().columns().every(function () {
                var column = this;
                $('<input type="search" data-colIndex="'+colIndex+'" placeholder="Search" class="skdt-filter-input btn-squared" /><i data-colIndex="'+colIndex+'" class="ski-cancel-circle clearFilter"></i>')
                        .appendTo($("#" + tableId + " thead tr:eq(1) th:eq(" + colIndex + ")"))
                        .on('keyup change', function () {
                            if (column.search() !== this.value) {
                                column.search(this.value).draw();
                            }
                        });

                colIndex++;
            });

            __toggleFilter();
            __clear_filter();
        }
    });

    $("#" + tableId + "_wrapper .DatatableAllRounderSearch").keyup(function () {
        datatable.search($(this).val(), true).draw();
    })

    $("#" + tableId + "_wrapper .cursorPointer").click(function () {
        switch ($(this).attr('data-action')) {
            case 'clearSearch':
                __clear_search();
                break
        }
    })

    function __toggleFilter() {
        $("#" + tableId + "_wrapper .skDtfilterToggle").click(function () {
            $("#" + tableId + "_wrapper thead tr:eq(1)").toggle();
        });
    }

    function __clear_search() {
        $("#" + tableId + "_wrapper .DatatableAllRounderSearch").val('').trigger('keyup');
    }

    function __clear_filter() {
        $("#" + tableId + "_wrapper .clearFilter").click(function(){
            $("input[data-colIndex='"+$(this).attr('data-colIndex')+"']").val('').trigger('keyup');
        })
    }
});