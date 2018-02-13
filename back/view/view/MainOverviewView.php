<?php
//namespace App\View;

class MainOverviewView {
	private $espService;
	private $roomService;
	private $doorService;
	private $locationService;
	private $windowService;

	public function __construct(EspService $espService,
					RoomService $roomService,
					DoorService $doorService,
					LocationService $locationService,
					WindowService $windowService) {
		$this->espService = $espService;
		$this->roomService = $roomService;
		$this->doorService = $doorService;
		$this->locationService = $locationService;
		$this->windowService = $windowService;
	}

	public function output() {
		return $this->loadRootTemplate();
	}

	private function loadRootTemplate() {
		$file = __DIR__ . "/../../../front/build/index.html";
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
