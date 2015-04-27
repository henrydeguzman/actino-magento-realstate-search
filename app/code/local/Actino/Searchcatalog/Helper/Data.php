<?php

class Actino_Searchcatalog_Helper_Data extends Mage_Core_Helper_Abstract {
    function convert_time($hours1, $minutes1)
            {

                if ($hours1.length == 1) $hours1 = '0' + $hours1;
                if ($minutes1.length == 1) $minutes1 = '0' + $minutes1;
                if ($minutes1 == 0) $minutes1 = '00';
                if ($hours1 >= 12) {
                    if ($hours1 == 12) {
                        $hours1 = $hours1;
                        $minutes1 = $minutes1 . " PM";
                    }
                    else if ($hours1 == 24) {
                        $hours1 = 11;
                        $minutes1 = "59 PM";
                    }
                    else {
                        $hours1 = $hours1 - 12;
                        $minutes1 = $minutes1 . " PM";
                    }
                } else {
                    $hours1 = $hours1;
                   $minutes1 = $minutes1 . " AM";
                }
                if ($hours1 == 0) {
                    $hours1 = 12;
                    $minutes1 = $minutes1;
                }
                $thisArray = array(
                    "hours" => $hours1,
                    "minutes" => $minutes1
                );

                return $thisArray;
            }
    public function sayhi()
    {

        echo "say hi ko";
    }
}