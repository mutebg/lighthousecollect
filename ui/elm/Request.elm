module Request exposing (..)

import Http
import Types exposing (..)
import Data exposing (projectDecoder, reportsListDecoder)


apiBase : String
apiBase =
    "http://localhost:3000/api/"


getProjects : Cmd Msg
getProjects =
    let
        url =
            apiBase ++ "projects"

        request =
            Http.get url projectDecoder
    in
        Http.send LoadProjects request


getReports : ReportFilter -> Cmd Msg
getReports filter =
    let
        paramsList =
            [ filter.project
                |> Maybe.map (\c -> "project=" ++ c)
            , filter.url
                |> Maybe.map (\c -> "url=" ++ c)
            , filter.task
                |> Maybe.map (\c -> "task=" ++ c)
            , filter.dateFrom
                |> Maybe.map (\c -> "dateFrom=" ++ c)
            , filter.dateTo
                |> Maybe.map (\c -> "dateTo=" ++ c)
            ]

        checkParam c =
            case c of
                Nothing ->
                    False

                Just a ->
                    True

        params =
            paramsList
                |> List.filter checkParam
                |> List.map (\c -> Maybe.withDefault "" c)

        url =
            apiBase ++ "list?" ++ (String.join "&" params)

        request =
            Http.get url reportsListDecoder
    in
        Http.send LoadReports request


getReport : String -> Cmd Msg
getReport id =
    let
        url =
            apiBase ++ "view/" ++ id

        request =
            Http.getString url
    in
        Http.send LoadReportDetails request
