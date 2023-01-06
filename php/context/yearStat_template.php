<html>

<body style="font-family: sans-serif;">
    <div style="position: relative;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;">
        <h1 style="
        margin-bottom: 20px;
        width: 100%;
        display: block;
    font-size: 2em;
    font-weight: bold;
    color: #14213d;
    border-bottom: 1px solid #ccc;">{nev}
            <span style="padding-left: 5px;
    color: #fca311;
    font-size: 0.8em;">{azonosito}</span>
        </h1>
    </div>

    <div style="
    padding: 9px;
    ">
        <h2 style="
        margin: 0;
        padding: 0;
    color: #14213d;">{year} évi statisztikád</h2>
        <table style="text-align: center; margin: 10px auto;border-collapse: collapse;">
            <tr>
                <th style="
                color:#14213d;
                padding: 10px;
                font-size: 1em;
                border-right: 1px solid #ccc;
                ">
                    Nyerési esély
                </th>
                <th style="
                color:#14213d;
                padding: 10px;
                font-size: 1em;
                ">
                    Vesztési esély
                </th>
            </tr>
            <tr>
                <td style="
                padding: 10px;
                font-size: 1.3em;
                border-right: 1px solid #ccc;
                ">
                    {winrate} %
                </td>
                <td style="
                padding: 10px;
                font-size: 1.3em;

                ">
                    {loserate} %
                </td>
            </tr>
            <tr>
                <th colspan="2" style="
                color:#14213d;
                padding: 10px;
                font-size: 1em;
                border-top: 1px solid #ccc;
                ">
                    Játékok
                </th>
            </tr>
            <tr>
                <td colspan="2"  style="
                padding: 10px;
                font-size: 1.3em;
                border-bottom: 1px solid #ccc;
                ">
                    {games}
                </td>

            </tr>
            <tr>
                <th style="
                color:#14213d;
                padding: 10px;
                font-size: 1em;
                border-right: 1px solid #ccc;
                ">
                    Győzelmek
                </th>
                <th style="
                color:#14213d;
                padding: 10px;
                font-size: 1em;
                ">
                    Vesztések
                </th>
            </tr>
            <tr>
                <td  style="
                padding: 10px;
                font-size: 1.3em;
                border-right: 1px solid #ccc;
                ">
                    {wins}
                </td>
                <td  style="
                padding: 10px;
                font-size: 1.3em;

                ">
                    {loses}
                </td>
            </tr>

        </table>
    </div>

    <p style="text-align: center;">

        <a href="http://games.gyulaibalazs.hu/" style="
        background:#fca311;
        border-radius: 5px;
        padding: 10px;
        height: 30px;
        color:#14213d;
        font-weight: bold;
        text-decoration: none;
        ">
            Teljes statisztika
        </a>
    </p>
</body>

</html>