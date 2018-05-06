module Data exposing (..)

import Json.Decode as Decode
import Json.Decode.Pipeline as DecodePipe
import Json.Encode as Encode
import Types exposing (..)


projectDecoder : Decode.Decoder (List Project)
projectDecoder =
    Decode.list (Decode.string)


reportsListDecoder : Decode.Decoder (List ReportListItem)
reportsListDecoder =
    Decode.list reportListItemDecoder


reportListItemDecoder : Decode.Decoder ReportListItem
reportListItemDecoder =
    DecodePipe.decode ReportListItem
        |> DecodePipe.required "task" Decode.string
        |> DecodePipe.required "generatedTime" Decode.string
        |> DecodePipe.required "urls" reportSummaryListDecoder


reportSummaryListDecoder : Decode.Decoder (List ReportSummary)
reportSummaryListDecoder =
    Decode.list reportSummaryDecoder


reportSummaryDecoder : Decode.Decoder ReportSummary
reportSummaryDecoder =
    DecodePipe.decode ReportSummary
        |> DecodePipe.required "id" Decode.string
        |> DecodePipe.required "url" Decode.string
        |> DecodePipe.required "total" Decode.int
        |> DecodePipe.required "data" reportSummaryDataListDecoder


reportSummaryDataListDecoder : Decode.Decoder (List ReportSummaryData)
reportSummaryDataListDecoder =
    Decode.list reportSummaryDataDecoder


reportSummaryDataDecoder : Decode.Decoder ReportSummaryData
reportSummaryDataDecoder =
    DecodePipe.decode ReportSummaryData
        |> DecodePipe.required "label" Decode.string
        |> DecodePipe.required "value" Decode.int
