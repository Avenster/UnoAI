#include <crow.h>
#include "GameState.h" 

int main() {
    crow::SimpleApp app;
    GameState gameState;
    auto addCorsHeaders = [](crow::response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        res.set_header("Access-Control-Max-Age", "3600");
    };
    CROW_ROUTE(app, "/api/<path>")
    .methods("OPTIONS"_method)
    ([&addCorsHeaders](const crow::request&, std::string) {
        crow::response res(204);
        addCorsHeaders(res);
        return res;
    });

    CROW_ROUTE(app, "/api/test")
    .methods("GET"_method)
    ([&addCorsHeaders]() {
        crow::response res("Test successful");
        addCorsHeaders(res);
        return res; 
    });
    CROW_ROUTE(app, "/api/start-game")
    .methods("POST"_method)
    ([&gameState, &addCorsHeaders](const crow::request&) {
        gameState.initializeGame();
        crow::response res(gameState.getGameState().dump());
        res.set_header("Content-Type", "application/json");
        addCorsHeaders(res);
        return res;
    });

    CROW_ROUTE(app, "/api/play-card")
    .methods("POST"_method)
    ([&gameState, &addCorsHeaders](const crow::request& req) {
        try {
            auto body = json::parse(req.body);
            size_t cardIndex = body["cardIndex"].get<size_t>();
            auto response = gameState.playCard(cardIndex);
            crow::response res(response.dump());
            res.set_header("Content-Type", "application/json");
            addCorsHeaders(res);
            return res;
        } catch (const std::out_of_range&) {
            return crow::response(400, json({{"error", "Invalid card index"}}).dump());
        } catch (const std::runtime_error& e) {
            return crow::response(400, json({{"error", e.what()}}).dump());
        } catch (const std::exception& e) {
            return crow::response(500, json({{"error", e.what()}}).dump());
        }
    });
    CROW_ROUTE(app, "/api/draw-card")
    .methods("POST"_method)
    ([&gameState, &addCorsHeaders](const crow::request&) {
        auto res = crow::response(gameState.drawCard().dump());
        res.set_header("Content-Type", "application/json");
        addCorsHeaders(res);
        return res;
    });
    app.port(3001)
       .multithreaded()
       .run();

    return 0;
}
