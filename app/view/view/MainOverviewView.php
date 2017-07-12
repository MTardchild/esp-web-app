<?php
//namespace App\View;

class MainOverviewView {
	private $_espService;
	private $_connectionService;

	private $_espCollection = array();

	public function __construct(EspService $espService) {
		$this->_espService = $espService;
		array_push($this->_espCollection, $espService->getEsp(1));
		array_push($this->_espCollection, $espService->getEsp(2));
	}

	public function output() {
		return $this->loadTemplate();
	}

	private function loadTemplate() {
		$file = __DIR__ . "/../template/RootTemplate.php";
		$template = $this->getTemplate($file);

		return $template;
	}

	private function getTemplate($file) {
		$buffer = "Could not find template";
		$exists = file_exists($file);

		if ($exists) {
			ob_start();
			include $file;
			$buffer = ob_get_contents();
			ob_end_clean();
		}

		return $buffer;
	}
}
