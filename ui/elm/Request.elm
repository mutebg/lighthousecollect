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
        projectParam =
            filter.project |> Maybe.map (\c -> "project=" ++ c) |> Maybe.withDefault ""

        url =
            apiBase ++ "list?" ++ projectParam

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
