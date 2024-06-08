const { EmbedBuilder } = require("discord.js");
const smsBomber = require("../modules/sms.js");

module.exports = { 
    name: "relaxbomber",
    usage: "/relaxbomber <numara> <miktar>",
    options: [
        {
            name: "numara",
            description: "Numara (Örn: 5321234567)",
            type: 3,
            required: true
        },
        {
            name: "miktar",
            description: "Miktar",
            type: 4,
            required: true
        }
    ],
    category: "Bot", 
    description: "RelaX Bomber",
    run: async (client, interaction) => {
        interaction.deferReply();
        let numara = interaction.options.getString("numara");
        let miktar = interaction.options.getInteger("miktar");
        if (!numara) return interaction.editReply({ content: "Lütfen Bir Numara Giriniz.", ephemeral: true });
        if (numara.toString().length > 10) return interaction.editReply({ content: "Lütfen Geçerli Bir Numara Giriniz.", ephemeral: true });
        if (isNaN(miktar)) return interaction.editReply({ content: "Lütfen Bir Miktar Giriniz.", ephemeral: true });
        
        if (miktar > 100) return interaction.editReply({ content: "Maksimum 100 Mesaj Gönderebilirsiniz.", ephemeral: true });
        if (miktar < 1) return interaction.editReply({ content: "Minimum 1 Mesaj Gönderebilirsiniz.", ephemeral: true });

        let embed = new EmbedBuilder()
        .setTitle("RelaX Sms Bomber")
        .setDescription(`**${miktar}** Adet Mesaj **${numara}** Numarasına Gönderiliyor!`)
        .setFooter({ text: "RelaX Bomber", iconURL: client.user.avatarURL() })
        .setTimestamp()

        setTimeout(async () => {
            smsBomber(numara, miktar);
            try {
                await interaction.editReply({ embeds: [embed] });
            } catch (e) {
                console.log(e);
            }
        }, 5000);
    }
}
