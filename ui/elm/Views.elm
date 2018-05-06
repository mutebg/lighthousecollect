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
                , td [] [ span [ class "badge badge-pill badge-primary" ] [ text <| toString u.total ] ]
                ]
            , tr []
                [ td [ colspan 2 ]
                    (List.map
                        (\d ->
                            span [ class "border border-primary rounded" ]
                                [ text d.label
                                , span [ class "badge badge-pill badge-primary" ] [ text <| toString d.value ]
                                ]
                        )
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
    div [ class "result-filter" ] [ text "Result filter" ]


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
