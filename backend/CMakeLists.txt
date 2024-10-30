cmake_minimum_required(VERSION 3.10)
project(uno_server)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add Crow subdirectory if you have it as a submodule
add_subdirectory(Crow)

# Find Boost (required by ASIO)
find_package(Boost COMPONENTS system REQUIRED)

# Add your source files
add_executable(uno_server main.cpp)

# Include directories
target_include_directories(uno_server PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/Crow/include
    ${Boost_INCLUDE_DIRS}
)

# Link libraries
target_link_libraries(uno_server PRIVATE
    Crow::Crow
    ${Boost_LIBRARIES}
)