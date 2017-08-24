<?php
//namespace App\View;

class MainOverviewView {
	private $espService;
	private $_connectionService;

	public function __construct(EspService $espService) {
		$this->espService = $espService;
	}

	public function output() {
		return $this->loadRootTemplate();
	}

	private function loadRootTemplate() {
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
