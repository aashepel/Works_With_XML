window.onload = function()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'autos.xml', false);
    xhr.overrideMimeType('text/xml');
    xhr.send();
    if (xhr.status != 200)
    {
        alert(xhr.status + ': ' + xhr.statusText);
    }
    else
    {
        console.log(xhr.responseXML);
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(xhr.responseText, "application/xml");
    console.log(doc)
    var autos = [].slice.call(doc.getElementsByTagName("auto"));
    var container = document.getElementsByClassName("container")[0]

    autos.forEach(element => {
        let auto_obj = getObjectFromXmlElement(element);
        console.log(auto_obj)
        console.log(element)
        container.innerHTML += 
        `
        <div class="wrapper-block">
            <div class="general-block info-block">
                <p class="title-block">General:</p>
                <ul class="fields-of-block">
                    <li>Model: ${auto_obj.general.model}</li>
                    <li>Year of manufacture: ${auto_obj.general.year_manufacture}</li>
                    <li>Color: ${auto_obj.general.color}</li>
                    <li>Price: ${auto_obj.general.price}</li>
                </ul>
            </div>
            <div class="detail-block info-block">
                <p class="title-block">Detail:</p>
                <ul class="fields-of-block">
                    <li>Weight: ${auto_obj.detail.weight}</li>
                    <li>Drive: ${auto_obj.detail.drive}</li>
                </ul>
                <div class="engine-block info-block">
                    <p class="title-block">Engine:</p>
                    <ul class="fields-of-block">
                        <li>Type: ${auto_obj.detail.engine.type}</li>
                        <li>Fuel: ${auto_obj.detail.engine.fuel}</li>
                        <li>Volume: ${auto_obj.detail.engine.volume}</li>
                        <li>Supercharger type: ${auto_obj.detail.engine.supercharger_type}</li>
                        <li>Max power: ${auto_obj.detail.engine.max_power}</li>
                        <li>Max torque: ${auto_obj.detail.engine.max_torque}</li>
                    </ul>
                </div>
            </div>
        </div>
        `
    });

    function getGeneralTag(element)
    {
        return element.getElementsByTagName("general")[0];
    }

    function getDetailTag(element)
    {
        return element.getElementsByTagName("detail")[0];
    }
    
    function getModelElement(element)
    {
        return getGeneralTag(element).getElementsByTagName("model")[0].innerHTML;
    }

    function getYearManufactureElement(element)
    {
        return getGeneralTag(element).getElementsByTagName("year_manufacture")[0].innerHTML;
    }

    function getColorElement(element)
    {
        return getGeneralTag(element).getElementsByTagName("color")[0].innerHTML;
    }

    function getPriceElement(element)
    {
        return getGeneralTag(element).getElementsByTagName("price")[0].innerHTML;
    }

    function getWeightElement(element)
    {
        return getDetailTag(element).getElementsByTagName("weight")[0].innerHTML;
    }
    
    function getDriveElement(element)
    {
        return getDetailTag(element).getElementsByTagName("drive")[0].innerHTML;
    }

    function getEngineTag(element)
    {
        return getDetailTag(element).getElementsByTagName("engine")[0];
    }

    function getTypeEngine(element)
    {
        return getEngineTag(element).getElementsByTagName("type")[0].innerHTML;
    }

    function getFuelEngine(element)
    {
        return getEngineTag(element).getElementsByTagName("fuel")[0].innerHTML;
    }

    function getVolumeEngine(element)
    {
        return getEngineTag(element).getElementsByTagName("volume")[0].innerHTML;
    }

    function getSuperChargerTypeEngine(element)
    {
        return getEngineTag(element).getElementsByTagName("supercharger_type")[0].innerHTML;
    }

    function getMaxPowerEngine(element)
    {
        return getEngineTag(element).getElementsByTagName("max_power")[0].innerHTML;
    }

    function getMaxTorqueEngine(element)
    {
        return getEngineTag(element).getElementsByTagName("max_torque")[0].innerHTML;
    }

    function getObjectFromXmlElement(xmlElement)
    {
        const auto = {
            general: {
                model: getModelElement(xmlElement),
                year_manufacture: getYearManufactureElement(xmlElement),
                color: getColorElement(xmlElement),
                price: getPriceElement(xmlElement)
            },

            detail: {
                weight: getWeightElement(xmlElement),
                drive: getDriveElement(xmlElement),
    
                engine: {
                    type: getTypeEngine(xmlElement),
                    fuel: getFuelEngine(xmlElement),
                    volume: getVolumeEngine(xmlElement),
                    supercharger_type: getSuperChargerTypeEngine(xmlElement),
                    max_power: getMaxPowerEngine(xmlElement),
                    max_torque: getMaxTorqueEngine(xmlElement)
                }
            }
        };

        return auto;
    }
}