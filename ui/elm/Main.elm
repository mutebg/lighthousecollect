module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Navigation
import UrlParser as Url exposing ((</>), (<?>), s, int, stringParam, top)
import Types exposing (..)
import Views exposing (..)
import Request exposing (getProjects, getReports, getReport)
import Debug


-- APP


main : Program Never Model Msg
main =
    Navigation.program UrlChange
        { init = init
        , view = view
        , update = update
        , subscriptions = (\_ -> Sub.none)
        }


init : Navigation.Location -> ( Model, Cmd Msg )
init location =
    ( model
    , Cmd.batch [ getProjects ]
    )


routeParse : Url.Parser (Page -> a) a
routeParse =
    Url.oneOf
        [ Url.map Home top
        , Url.map ViewProject (Url.s "project" </> Url.string)
        , Url.map ViewReport (Url.s "report" </> Url.string)
        ]



-- MODEL


model : Model
model =
    { page = Home
    , projects = []
    , reports = []
    , details = Nothing
    , filter =
        { project = Nothing
        , task = Nothing
        , url = Nothing
        , dateFrom = Nothing
        , dateTo = Nothing
        }
    }



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange location ->
            let
                newPage =
                    case Url.parseHash routeParse location of
                        Just page ->
                            page

                        _ ->
                            Home

                ( newModel, msgs ) =
                    case newPage of
                        Home ->
                            ( model, [ getProjects ] )

                        ViewProject project ->
                            let
                                filter =
                                    model.filter
                                        |> updateFilter "project" (Just project)
                                        |> updateFilter "task" Nothing
                                        |> updateFilter "url" Nothing
                            in
                                ( { model | filter = filter }, [ getReports filter ] )

                        ViewReport id ->
                            ( model, [ Cmd.none ] )

                -- _ ->
                --     [ Cmd.none ]
            in
                ( { newModel | page = newPage }, Cmd.batch msgs )

        LoadProjects (Ok list) ->
            ( { model | projects = list }, Cmd.none )

        LoadReports (Ok list) ->
            ( { model | reports = list }, Cmd.none )

        LoadReportDetails (Ok json) ->
            ( { model | details = Just json }, Cmd.none )

        _ ->
            ( model, Cmd.none )



-- VIEW
-- Html is defined as: elem [ attribs ][ children ]
-- CSS can be applied via class names or inline style attrib


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ Views.header
        , div [ class "container" ]
            [ case model.page of
                Home ->
                    Views.homePage model

                ViewProject id ->
                    Views.listPage model id

                ViewReport id ->
                    Views.detailsPage model id
            ]
        ]


updateFilter : String -> Maybe String -> ReportFilter -> ReportFilter
updateFilter key value filter =
    case key of
        "project" ->
            { filter | project = value }

        "task" ->
            { filter | task = value }

        "url" ->
            { filter | url = value }

        _ ->
            filter
