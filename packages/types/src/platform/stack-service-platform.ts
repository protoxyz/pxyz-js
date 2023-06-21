export const StackServicePlatform = {
    node_18: "node_18",
    python_39: "python_39",
    ruby_30: "ruby_30",
    php_80: "php_80",
    go_116: "go_116",
};
export type StackServicePlatform = (typeof StackServicePlatform)[keyof typeof StackServicePlatform];
