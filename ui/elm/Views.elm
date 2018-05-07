module Views exposing (..)

import Types exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, onCheck, onSubmit)
import Request exposing (apiBase)


header : Html Msg
header =
    div [ class "header" ] [ text "" ]


homePage : Model -> Html Msg
homePage model =
    div []
        [ h1 [] [ text "Projects" ]
        , projectTable model.projects
        ]


listPage : Model -> Project -> Html Msg
listPage model project =
    div []
        [ h1 [] [ text <| "Project: " ++ project ]
        , reportFilter model.filter
        , reportTable model.reports
        ]


detailsPage : Model -> String -> Html Msg
detailsPage model id =
    let
        iframeSrc =
            apiBase ++ "view/" ++ id ++ "/html"
    in
        div []
            [ iframe [ class "report-iframe", src iframeSrc ] []
            ]


reportTable : List ReportListItem -> Html Msg
reportTable list =
    let
        rowUrl u =
            [ tr [ class "" ]
                [ td []
                    [ a [ href <| "#report/" ++ u.id ] [ text u.url ]
                    ]
                , td []
                    [ createPill "total" u.total ]
                ]
            , tr []
                [ td [ colspan 2 ]
                    (List.map
                        (\d -> createPill d.label d.value)
                        u.data
                    )
                ]
            ]

        rowView r =
            (tr [ class "table-secondary" ]
                [ td [] [ text r.task ]
                , td [] [ text r.generatedTime ]
                ]
            )
                :: List.concatMap rowUrl r.urls

        rows =
            List.concatMap rowView list
    in
        table [ class "table result-table" ]
            [ tbody
                []
                rows
            ]


reportFilter : ReportFilter -> Html Msg
reportFilter filter =
    Html.form [ class "result-filter", onSubmit FilterReports ]
        [ div [ class "row" ]
            [ div [ class "column" ]
                [ input
                    [ type_ "text"
                    , placeholder "Task"
                    , onInput (\s -> UpdateReportFilter "task" s)
                    ]
                    []
                ]
            , div [ class "column" ]
                [ input
                    [ type_ "text"
                    , placeholder "URL"
                    , onInput (\s -> UpdateReportFilter "url" s)
                    ]
                    []
                ]
            , div [ class "column" ]
                [ input
                    [ type_ "date"
                    , placeholder "Date from"
                    , onInput (\s -> UpdateReportFilter "dateFrom" s)
                    ]
                    []
                ]
            , div [ class "column" ]
                [ input
                    [ type_ "date"
                    , placeholder "Date to"
                    , onInput (\s -> UpdateReportFilter "dateTo" s)
                    ]
                    []
                ]
            , div [ class "column" ] [ button [ type_ "submit", class "button-primary" ] [ text "Filter" ] ]
            ]
        ]


projectTable : List Project -> Html Msg
projectTable list =
    let
        createLink project =
            a [ href <| "#project/" ++ project ] [ text project ]
    in
        table [ class "table table-striped project-table" ]
            [ thead []
                [ tr []
                    [ th [] [ text "Name" ] ]
                ]
            , tbody []
                (List.map (\p -> tr [] [ td [] [ createLink p ] ]) list)
            ]


reportStatus : Int -> String
reportStatus value =
    if value > 75 then
        "pass"
    else if value > 45 then
        "average"
    else
        "fail"


createPill : String -> Int -> Html Msg
createPill label value =
    let
        extraClass =
            reportStatus value
    in
        span [ class <| "pill pill--" ++ extraClass ]
            [ text label
            , span [ class "badge" ] [ text <| toString value ]
            ]
