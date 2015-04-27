<?php

class Actino_Searchcatalog_Block_Searchcatalog extends Mage_Core_Block_Template {
    public function getJsUrl($path)
    {
     return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_JS) . $path . '.js';
    }
}