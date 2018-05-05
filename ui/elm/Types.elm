module Types exposing (..)

import Date exposing (..)


type Msg
    = NoOp


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
    { url : URL
    , total : Int
    , data : List ReportSummaryData
    }


type alias ReportListItem =
    { task : TaskId
    , generatedTime : Date
    , urls : List ReportSummary
    }


type alias ReportFilter =
    { project : Maybe Project
    , task : Maybe TaskId
    , url : Maybe URL
    , dateFrom : Maybe Date
    , dateTo : Maybe Date
    }


type alias Model =
    { projects : List Project
    , reports : List ReportListItem
    , filter : ReportFilter
    }
