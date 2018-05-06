module Types exposing (..)

import Http
import Navigation
import Date exposing (..)


type Msg
    = NoOp
    | UrlChange Navigation.Location
    | LoadProjects (Result Http.Error (List Project))
    | LoadReports (Result Http.Error (List ReportListItem))
    | LoadReportDetails (Result Http.Error String)


type alias Project =
    String


type alias URL =
    String


type alias TaskId =
    String


type alias ReportSummaryData =
    { label : String
    , value : Int
    }


type alias ReportSummary =
    { id : String
    , url : URL
    , total : Int
    , data : List ReportSummaryData
    }


type alias ReportListItem =
    { task : TaskId
    , generatedTime : String
    , urls : List ReportSummary
    }


type alias ReportFilter =
    { project : Maybe Project
    , task : Maybe TaskId
    , url : Maybe URL
    , dateFrom : Maybe Date
    , dateTo : Maybe Date
    }


type Page
    = Home
    | ViewProject String
    | ViewReport String


type alias Model =
    { page : Page
    , projects : List Project
    , reports : List ReportListItem
    , details : Maybe String
    , filter : ReportFilter
    }
