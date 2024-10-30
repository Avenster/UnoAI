#ifndef STRING_UTILS_H
#define STRING_UTILS_H

#include <string>
#include <algorithm>
#include <cctype>

inline bool string_equals(const std::string& str1, const std::string& str2) {
    if (str1.length() != str2.length()) {
        return false;
    }
    return std::equal(
        str1.begin(), str1.end(),
        str2.begin(),
        [](char a, char b) {
            return std::tolower(a) == std::tolower(b);
        }
    );
}

inline std::string to_lower(const std::string& str) {
    std::string result = str;
    std::transform(result.begin(), result.end(), result.begin(),
        [](unsigned char c) { return std::tolower(c); }
    );
    return result;
}

inline std::string to_upper(const std::string& str) {
    std::string result = str;
    std::transform(result.begin(), result.end(), result.begin(),
        [](unsigned char c) { return std::toupper(c); }
    );
    return result;
}

inline std::string trim(const std::string& str) {
    const std::string WHITESPACE = " \n\r\t\f\v";
    size_t start = str.find_first_not_of(WHITESPACE);
    if (start == std::string::npos) {
        return "";
    }
    size_t end = str.find_last_not_of(WHITESPACE);
    return str.substr(start, end - start + 1);
}

#endif // STRING_UTILS_H