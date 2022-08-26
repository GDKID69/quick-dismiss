const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");
const EphemeralAccessories = getModule(m => m.default?.displayName === "EphemeralAccessories", false);

module.exports = class QuickDismiss extends Plugin {
    startPlugin() {
        inject("quickDInject", EphemeralAccessories, "default", (args, res) => {
            const msgNode = document.getElementById(`chat-messages-${args[0].message.id}`);
            if (!msgNode) return res;

            msgNode.addEventListener(
                "contextmenu",
                _ => res.props.children[1][1].props.onClick()
            );

            return res;
        });
    };

    pluginWillUnload() {
        uninject("quickDInject");
    };
};
