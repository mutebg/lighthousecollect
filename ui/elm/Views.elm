module Views exposing (..)

import Types exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, onCheck, onSubmit)


header : Html Msg
header =
    div [ class "header" ] [ text "I am proud header" ]


resultTable : List ReportListItem -> Html Msg
resultTable list =
    div [ class "result-table" ] [ text "Result table" ]


resultFilter : ReportFilter -> Html Msg
resultFilter filter =
    div [ class "result-filter" ] [ text "Result filter" ]


projectTable : List Project -> Html Msg
projectTable list =
    div [ class "project-table" ] [ text "Project table" ]
